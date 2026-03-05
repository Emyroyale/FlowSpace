import { google, youtube_v3 } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import * as fs from 'fs';
import * as path from 'path';

// Define the scopes we need
const SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly',
];

// Provide the path to your OAuth2 client credentials
// Needs to be generated from Google Cloud Console for emy@royaleautomation.com
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

/**
 * Reads previously authorized credentials from the save file.
 */
async function loadSavedCredentialsIfExist(): Promise<any> {
    try {
        const content = fs.readFileSync(TOKEN_PATH, 'utf8');
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 */
async function saveCredentials(client: any): Promise<void> {
    const content = fs.readFileSync(CREDENTIALS_PATH, 'utf8');
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    fs.writeFileSync(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 */
async function authorize(): Promise<any> {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }

    if (!fs.existsSync(CREDENTIALS_PATH)) {
        throw new Error(`Missing ${CREDENTIALS_PATH}. Please generate OAuth client ID from Google Cloud Console.`);
    }

    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });

    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Uploads a video to YouTube.
 */
export async function uploadToYouTube(videoFilePath: string, title: string, description: string): Promise<string | null> {
    try {
        const auth = await authorize();
        const youtube = google.youtube({ version: 'v3', auth });

        const fileSize = fs.statSync(videoFilePath).size;
        console.log(`Starting upload of ${videoFilePath} (${fileSize} bytes)...`);

        const res = await youtube.videos.insert({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title: title,
                    description: description,
                    tags: ['stoicism', 'productivity', 'deepwork', 'flowspace', 'adhd'],
                    categoryId: '27', // Education
                },
                status: {
                    privacyStatus: 'private', // Upload as private first for review
                },
            },
            media: {
                body: fs.createReadStream(videoFilePath),
            },
        });

        console.log('Video uploaded successfully!');
        console.log(`Video URL: https://www.youtube.com/watch?v=${res.data.id}`);

        return res.data.id || null;

    } catch (error) {
        console.error('Error uploading to YouTube:', error);
        throw error;
    }
}

if (require.main === module) {
    // Mock entrypoint for testing directly
    console.log("Please ensure credentials.json is present in the root directory before running this file directly.");
}

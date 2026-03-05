import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN; // e.g. urn:li:person:123456789

/**
 * Publishes a post to LinkedIn with an attached YouTube link.
 */
export async function publishToLinkedIn(youtubeUrl: string, postContent: string): Promise<string | null> {
    if (!LINKEDIN_ACCESS_TOKEN || !LINKEDIN_PERSON_URN) {
        throw new Error('Missing LinkedIn credentials in .env.local (LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN)');
    }

    const endpoint = 'https://api.linkedin.com/v2/ugcPosts';

    const payload = {
        author: LINKEDIN_PERSON_URN,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: postContent,
                },
                shareMediaCategory: 'ARTICLE',
                media: [
                    {
                        status: 'READY',
                        description: {
                            text: 'Watch the full video on YouTube',
                        },
                        originalUrl: youtubeUrl,
                        title: {
                            text: 'The Stoic Mindset for Deep Work - FlowSpace',
                        },
                    },
                ],
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'CONNECTIONS', // Change to 'PUBLIC' when ready
        },
    };

    try {
        const response = await axios.post(endpoint, payload, {
            headers: {
                'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Content-Type': 'application/json',
            },
        });

        console.log('Successfully posted to LinkedIn:', response.data.id);
        return response.data.id;
    } catch (error: any) {
        console.error('Error posting to LinkedIn:', error.response ? error.response.data : error.message);
        throw error;
    }
}

if (require.main === module) {
    // Mock entrypoint
    publishToLinkedIn('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'This is a test post from the FlowSpace content automation pipeline! #Stoicism #Productivity')
        .then(() => console.log('Test successful'))
        .catch((err) => console.error(err));
}

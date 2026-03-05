import { generateContentScript } from './generateScript';
import { runBrowserSubagent } from './browserSubagent';
import { uploadToYouTube } from './uploadYouTube';
import { publishToLinkedIn } from './publishLinkedIn';
import * as path from 'path';
import * as fs from 'fs';

async function orchestrate() {
    console.log("=== STARTING CONTENT AUTOMATION PIPELINE ===");

    try {
        // 1. Generate Script
        console.log("\n[1/4] Generating script via AI...");
        const script = await generateContentScript();
        console.log("Script successfully generated.");

        // 2. Browser Subagent Video Creation
        console.log("\n[2/4] Triggering Browser Subagent for Google Vids...");
        await runBrowserSubagent(script);

        // In a fully automated production environment without a human-in-the-loop, 
        // the subagent would download the video file to a known path.
        // For this example, we assume the exported file lands in the current directory:
        const exportedVideoPath = path.join(process.cwd(), 'The_Stoic_Mindset_for_Deep_Work.mp4');

        // Wait or simulate waiting for export here...
        console.log("Assuming browser subagent exported video to:", exportedVideoPath);

        // 3. YouTube Upload
        console.log("\n[3/4] Uploading to YouTube...");
        if (!fs.existsSync(exportedVideoPath)) {
            console.log("Skipping YouTube upload: Exported video not found at path.");
        } else {
            const videoId = await uploadToYouTube(
                exportedVideoPath,
                "The Stoic Mindset for Deep Work",
                "Overcome distractions and build unbreakable focus with these ancient Stoic principles applied to modern productivity. Try out FlowSpace to implement these principles today! #Stoicism #Productivity #DeepWork #FlowSpace #ADHD"
            );

            if (videoId) {
                const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

                // 4. LinkedIn Publish
                console.log("\n[4/4] Publishing to LinkedIn...");
                const linkedinPostText = `New video out! 🧘‍♂️ The modern world is engineered to distract you. Discover how to apply the ancient Stoic mindset to achieve Deep Work and overcome distractions. \n\nCheck out the full video here and try our focus tool FlowSpace! #Stoicism #Productivity #DeepWork`;
                await publishToLinkedIn(youtubeUrl, linkedinPostText);
            }
        }

        console.log("\n=== PIPELINE COMPLETED SUCCESSFULLY ===");

    } catch (error) {
        console.error("\n=== PIPELINE FAILED ===");
        console.error(error);
        process.exit(1);
    }
}

if (require.main === module) {
    orchestrate();
}

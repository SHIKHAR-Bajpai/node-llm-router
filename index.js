const { fail } = require('assert');
const { LLMRouter , LeaderboardProvider } = require('llm-router-core');
require("dotenv").config()
const readline = require("readline")

const provider = new LeaderboardProvider();

// Initialize router with live scraping capabilities
const router = new LLMRouter({
  geminiApiKey: process.env.GEMINI_API_KEY,    // Optional: enables AI analysis
  firecrawlApiKey: process.env.GEMINI_API_KEY // Optional: enables live Vellum scraping
});

// Get intelligent model recommendation with live data

( async function(){ 
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    try {
    
    // get user query 
    const query = await new Promise( resolve => {
        rl.question("\nEnter you query: ", (input) => {
            resolve(input)
        })
    })

    if(!query){
        console.log("No query entered!!")
        return 
    }

    console.log("\nAvailable models for comparison\n")
    // Fetch latest model data
    const models = await provider.getModels();

    models.forEach(model => {
    console.log(`${model.name} (${model.provider})`);
    console.log(`Performance: ${model.performanceScore}/10`);
    console.log(`Cost Efficiency: ${model.costScore}/10`);
    console.log(`Speed: ${model.speedScore}/10`);
    console.log('---');
    });
    console.log("\n==============================\n")
    // Get intelligent model recommendation with live data
    const result = await router.selectModel(
      query,
      { performance: 0.6, cost: 0.2, speed: 0.2 }
    );
    console.log(result)
    console.log("\n==============================\n")
    console.log('Recommended:', result.selectedModel.name);
    console.log('Score:', result.score);
    console.log('Response:', result.response);
    console.log("\n==============================\n")
  } catch (error) {
    console.error('An error occurred:', error);
  } finally{
    rl.close()
  }

})();
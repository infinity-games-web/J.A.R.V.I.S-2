import express from "express";
import cors from "cors";
import OpenAI from "openai";
import { saveMessage, getMemory } from "./memory.js";
import { searchInternet } from "./internet.js";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req,res)=>{

const user = req.body.user || "anon";
const message = req.body.message;

saveMessage(user, message);
const history = getMemory(user).slice(-5).join("\n");

let internetInfo = "";

if(message.toLowerCase().includes("pesquise")){
internetInfo = await searchInternet(message);
}

const completion = await openai.chat.completions.create({
model:"gpt-4.1-mini",
messages:[
{
role:"system",
content:`Você é Jarvis 2.0.
Assistente pessoal avançado.
Histórico:
${history}
Internet:
${internetInfo}`
},
{role:"user",content:message}
]
});

res.json({
reply:completion.choices[0].message.content
});
});

app.listen(3000, ()=>console.log("Jarvis ativo"));

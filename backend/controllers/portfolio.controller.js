const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");
const Portfolio = require("../models/portfolioModel");


const groq = new Groq({
    apiKey: process.env.GROK_API_KEY,
});

const getGroqChatCompletion = async (fileData, jsonformat) => {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `${fileData} Convert the above text into the following JSON file format: ${jsonformat}. If any data is missing leave the key in JSON blank.dont alte rthe json format. strictly follow the provided JSON Format`,
            },
        ],
        model: "llama3-8b-8192",
    });
};

const template_promts = {
    "joyal": `
    {
  "basicDetails": {
        name: '',
        linkedin: '',
        github: '',
        location: '',
        email: ''
    },
  "skills": {
        frontend: [],
        backend: [],
        app: [],
        others: []
    },
  "projects": [
    {
        title: '',
        desc: '',
        techStack: [],
        figma: '',
        github: '',
    }
  ],
  "about": "give a introduction about the person in 4 to 5 lines",
}
    `,

    "arnab": `
    {
  "basicDetails": {
        name: '',
        linkedin: '',
        github: '',
        instagram: '',
        email: ''
    },
  "skills": [],
  "roles": [give an array of all the roles of the person like web developer,app developer etc],
  "projects": [
    {
        title: '',
        desc: '',
        techStack: [],
        github: '',
    }
  ],
  "experience": [
    {
        role: '',
        period: 'period should be like March 2020 - April 2021',
    }
  ],
  "about": "give a introduction about the person in 4 to 5 lines",
}
    `
}

module.exports = {
    resumeParser: async (req, res) => {
        try {
            const file = req.file;
            const template = req.body.template;
            const data = await pdfParse(file.buffer);
            const sumJson = await getGroqChatCompletion(data.text, template_promts[template]);
            const response = sumJson.choices[0]?.message?.content || ""
            if (response != "") {
                const jsonString = response.substring(response.indexOf('{'), response.lastIndexOf('}') + 1)
                const jsonObject = JSON.parse(jsonString);
                res.status(200).json({
                    status: true,
                    parsedData: jsonObject,
                });
            }
            else {
                res.status(200).json({
                    status: true,
                    text: "",
                });
            }
        }
        catch (e) {
            console.log(e)
            res.status(404).json({
                status: false,
            });
        }
    },
    createPortfolio: async (req, res) => {
        try {
            let details = req.body
            while (true) {
                let randomURL = generateRandomString(process.env.URL_LENGTH);
                const portfolio = await Portfolio.findOne({
                    url: randomURL
                })
                if (!portfolio) {
                    details["url"] = randomURL;
                    break
                }
            }
            const response = await Portfolio.create(details);
            res.status(201).send({ url: response.url, status: true })
        }
        catch (e) {
            res.status(404).json({
                status: false,
            });
        }
    },

    fetchPortfolio: async (req, res) => {
        try {
            const { portfolioId } = req.body
            const response = await Portfolio.findOne({ url: portfolioId });
            if (response) {
                res.status(201).send({ data: response, status: true })
            }
            else{
                res.status(200).send({ status: false })
            }
        }
        catch (e) {
            res.status(404).json({
                status: false,
            });
        }
    },
    fetchPortfolioList: async (req, res) => {
        try {
            const { userId } = req.body
            const response = await Portfolio.find({ userId: userId });
            res.status(201).send({ data: response, status: true })
        }
        catch (e) {
            res.status(404).json({
                status: false,
            });
        }
    },
    updatePortfolio: async (req, res) => {
        try {
            const details = req.body
            const {_id} = details
            delete details["_id"]
            const response = await Portfolio.findByIdAndUpdate({ _id: _id },details);
            res.status(201).send({ url: response.url, status: true })
        }
        catch (e) {
            res.status(404).json({
                status: false,
            });
        }
    },
}

const generateRandomString = length => Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
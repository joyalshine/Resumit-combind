const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        userId : {
            type: String,
            required: true
        },
        basicDetails: {
            type: Map,
            of: String,
            required: true,
        },
        skillDetailsArray: {
            type: Map,
            of: Array,
            required: true,
        },
        projectArray: [
            {
                type: Map,
                required: true,
            }
        ],
        experienceArray : [
            {
                type: Map,
            }
        ],
        about: {
            type: String,
            required: true
        },
        template: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)


const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
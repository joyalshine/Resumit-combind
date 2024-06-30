import React from 'react'
import DataValidationJoyal from '../DataValidationJoyal/DataValidationJoyal'
import DataValidationArnab from '../DataValidationArnab/DataValidationArnab'
import DataValidationTemplate3 from '../DataValidationTemplate3/DataValidationTemplate3'
import DataValidationTemplate4 from '../DataValidationTemplate4/DataValidationTemplate4'
import { useLocation } from 'react-router-dom';

function ValidateParsedData({ reqType }) {
    const { state: { template, parsedData } } = useLocation();

    const validation_components = {
        "joyal": <DataValidationJoyal parsedData={parsedData} reqType={reqType} />,
        "arnab": <DataValidationArnab parsedData={parsedData} reqType={reqType}  />,
        "template3": <DataValidationTemplate3 />,
        "template4": <DataValidationTemplate4 />
    }
    return (
        validation_components[template]
    )
}

export default ValidateParsedData

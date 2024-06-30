import LoadingPage from '@/components/LoadingPage/LoadingPage'
import ArnabPortfolio from '@/templates/arnab/pages/Home/ArnabPortfolio'
import JoyalPortfolio from '@/templates/joyal/pages/homePage/home'
import Template3Home from '@/templates/template_3/Template3Home'
import Template4Home from '@/templates/template_4/Template4Home'
import useFetchPortfolio from '@/useHooks/useFetchPortfolio'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageNotFound from '../PageNotFound/PageNotFound'

function PortfolioDisplay() {
    const { portfolioId } = useParams()
    const fetchPortfolio = useFetchPortfolio()

    const [isLoading, setisLoading] = useState(true)
    const [portfolioData, setportfolioData] = useState({})
    const [portfolioValid, setportfolioValid] = useState(false)

    const PORTFOLIO_TEMPLATES = {
        "joyal": <JoyalPortfolio portfolioDetails={portfolioData} />,
        "arnab": <ArnabPortfolio portfolioDetails={portfolioData} />,
        "template3": <Template3Home />,
        "template4": <Template4Home />
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetchPortfolio({ portfolioId });
            const { data, status } = response
            if (status) {
                setportfolioData(data)
                setportfolioValid(true)
                setisLoading(false)
            }
            else {
                setportfolioValid(false)
                setisLoading(false)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            {isLoading ? <LoadingPage /> : portfolioValid ? PORTFOLIO_TEMPLATES[portfolioData.template] : <PageNotFound />}
        </>
    )
}

export default PortfolioDisplay

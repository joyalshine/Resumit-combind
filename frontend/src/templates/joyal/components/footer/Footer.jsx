import React from 'react'
import './Footer.css'

function Footer({data}) {
  return (
    <div className='footer-root'>
        <div className='footer-div'>
            <div className="copyright">
                <h6>Copyright © 2023. All rights are reserved</h6>
            </div>
            <div className="links-footer">
                <span>
                    <a href={data.linkedin} target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </span>
                <span>
                    <a href={data.github}  target="_blank" rel="noreferrer">
                        <i className="fa-brands fa-github"></i> 
                    </a>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Footer

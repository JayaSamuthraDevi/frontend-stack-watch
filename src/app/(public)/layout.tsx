import Image from 'next/image'
import React from 'react'
import cpu_icon from '../../../public/assets/logo/logo.svg'
import auth_page_img from '../../../public/assets/auth_page_img.jpeg'
import "./auth_styles.scss"

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="auth_page">
      
      <div className="auth_left_section">
        <div className="form_container">
          <div className="flex gap-2 items-center justify-center mb-6">
            <Image src={cpu_icon} alt="logo" width="30" height={30} />
            <h1 className="cds--type-heading-06">Stack Watch</h1>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center mb-10">
              <h4 className="cds--type-heading-03">
                Welcome to Stackwatch
              </h4>

              <p className="cds--type-body-compact-01">
                Monitor your infrastructure with confidence
              </p>
          </div>
          {children}
        </div>
      </div>
      <div className="auth_right_section">
        <Image
          src={auth_page_img}
          alt="logo"
          width="500"
          height="1200"
          className="auth_page_img"
        />
      </div>
    </div>
  )
}

export default layout
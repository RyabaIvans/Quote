import classnames from "classnames"
import { ReactComponent as Button } from "../src/assets/icons/button.svg"
import { ReactComponent as Quotation } from "../src/assets/icons/quotation.svg"
import { ReactComponent as Twitter } from "../src/assets/icons/twitter.svg"
import { ReactComponent as Whatsapp } from "../src/assets/icons/whatsapp.svg"
import "./App.css"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"

export type ResponseType = ResponseTypeChild[]
export type ResponseTypeChild = {
  quote: string
  author: string
}

function App() {
  const [data, setData] = useState<ResponseType>()
  const [currentIndex, setCurrentIndex] = useState(0)

  const fetchData = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:3001/quotes"
      )
      const data = response.data
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getPrevQuote = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1)
  }
  const getNextQuote = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  const disabledBtn = () =>
    currentIndex === 0 ? "rotate cp disabled-button" : "rotate cp"

  const handleSocialAppShare = (link: string) => {
    if (data) {
      const quote = data[currentIndex].quote
      const author = data[currentIndex].author

      const encodedQuote = encodeURIComponent(quote)
      const encodedAuthor = encodeURIComponent(author)

      const message = `Цитата: ${encodedQuote}%0AАвтор: ${encodedAuthor}`
      const whatsappLink = `https://api.whatsapp.com/send?text=${message}`
      const tweetUrl =
        "https://twitter.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoicnUifQ%3D%3D%22%7D"

      const twitterShareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${tweetUrl}`

      link === "whatsappLink" ? (link = whatsappLink) : (link = twitterShareUrl)

      window.open(link)
    }
  }

  return (
    <>
      <header>
        <div className="top-strip" />
      </header>
      <div className="container">
        <div className="quotation-box ">
          <Quotation />

          <div className="quote">
            <p>{data && data[currentIndex].quote}</p>
            <span>- {data && data[currentIndex].author}</span>

            {/*<p>*/}
            {/*  In the end, we will remember not the words of our enemies, but the*/}
            {/*  silence of our friends.*/}
            {/*</p>*/}
            {/*<span>- Martin Luther King Jr.</span>*/}
          </div>
          <div className="bottom-navigation">
            <div>
              <Button className={disabledBtn()} onClick={getPrevQuote} />
              <Button className="cp" onClick={getNextQuote} />
            </div>
            <div className="share">
              <span>Share At:</span>
              <Twitter
                onClick={() => handleSocialAppShare("twitterShareUrl")}
                title="Post this quote on twitter!"
                className="cp"
              />
              <Whatsapp
                onClick={() => handleSocialAppShare("whatsappLink")}
                title="Post this quote on WhatsApp!"
                className="cp"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-strip" />
    </>
  )
}

export default App

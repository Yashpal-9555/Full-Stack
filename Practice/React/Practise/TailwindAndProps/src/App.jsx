import { useState } from 'react'
import Card from './components/Card'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello</h1>
      <Card name="monkey" price="$5" image="https://cdn.vox-cdn.com/thumbor/ZkmdkuJUTLgJh96_FWQ5zweGGxo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg" />
      <Card name="cat" price="$4" image="https://img.magnific.com/free-vector/hand-drawn-anime-kawaii-illustration_23-2150588965.jpg?semt=ais_hybrid&w=740&q=80"/>
    </>
  )
}

export default App

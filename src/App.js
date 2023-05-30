import React, {
  useState
} from "react";



function App() {
  const [count, setCount] = useState(4)
  return ( <
    >
    <
    button > - < /button> <
    span > {
      count
    } < /span> <
    button > + < /button>

    <
    />
  );
}

export default App;
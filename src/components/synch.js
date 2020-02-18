import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

const myAPI = process.env.REACT_APP_ALPHA_API;

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
function Stock(ticker, name, type, region){
    this.ticker = ticker;
    this.name = name;
    this.type = type;
    this.region = region;
}

export default function Asynchronous() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [name, setName] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const loading = open && options.length === 0;
  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => { 
       await sleep(1e3); // For demo purposes.
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  function queryAPI(){
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords= ${name} &apikey= ${myAPI}`)
        .then(res=>
         {
             const data = res.data.bestMatches;
             if (data){
              for (var i=0;i<data.length;i++){
                var add = `${data[i]["1. symbol"]} - ${data[i]["2. name"]}`
                countries.push(add);
              }
             }
             //console.log(countries);
         }
        ) 
      if (countries && name && name.length > 2) {
        console.log(countries);
        console.log(options);
        setOptions(countries);
      }
  }

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Asynchronous"
          fullWidth
          variant="outlined"
          onChange={(e)=>{setName(e.target.value)
          console.log(name)
          setCountries([])
          queryAPI()
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
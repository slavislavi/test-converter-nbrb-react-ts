import { useState, useEffect } from 'react';
import { CurrencyInput } from './components/CurrencyInput';
import { convert } from './utils/convert';
import { API_URL, BASE_CURRENCY, CURRENCIES_CONFIG } from './utils/constants';
import { Currency } from './types/Currency';
import './styles/App.css';

function App() {
    const [data, setData] = useState<Currency[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mainCurrency, setMainCurrency] = useState('');

    const onChangeHandler = (value: string) => {
        setMainCurrency(value);
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(API_URL)
            .then((response) => response.json())
            .then((data: Currency[]) => {
                setData(data.filter((currency) => CURRENCIES_CONFIG.includes(currency.Cur_Abbreviation)));
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="App">
            {isLoading ? <span className="loader"></span> : <h4 className="title">converter nbrb</h4>}
            <CurrencyInput
                label={BASE_CURRENCY}
                onChange={onChangeHandler}
                value={mainCurrency}
                disabled={isLoading}
            />
            {
                data?.map((currency) => (
                    <CurrencyInput
                        key={currency.Cur_ID}
                        label={currency.Cur_Abbreviation}
                        onChange={onChangeHandler}
                        value={convert(mainCurrency, currency)}
                        disabled={isLoading}
                    />
                ))
            }
        </div>
    );
}

export default App;

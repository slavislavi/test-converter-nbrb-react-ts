import { useState, useEffect } from 'react';
import { InputField } from './components/InputField';
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
            {
                isLoading ? <span className="loader"></span> : (
                    <InputField
                        currentAbbr={BASE_CURRENCY}
                        onChangeHandler={onChangeHandler}
                        currentValue={mainCurrency}
                        disabled={isLoading}
                    />
                )
            }
            {
                data.map((currency) => (
                    <InputField
                        key={currency.Cur_ID}
                        currentAbbr={currency.Cur_Abbreviation}
                        onChangeHandler={onChangeHandler}
                        currentValue={convert(mainCurrency, currency)}
                        disabled={isLoading}
                    />
                ))
            }
        </div>
    );
}

export default App;

import { useState, useEffect } from 'react';
import { InputField } from './components/InputField';
import { convert } from './utils/convert';
import { API_URL, CURRENCIES_CONFIG } from './utils/constants';
import './styles/App.css';
import { Currency } from './types/Currency';

// [{ Cur_Abbreviation, Cur_Scale, Cur_OfficialRate, ... }]
// Cur_Abbreviation = USD, RUB, EUR, ...

function App() {
    const [data, setData] = useState<Currency[]>([]);
    const [mainCurrency, setMainCurrency] = useState('');

    const onChangeHandler = (value: string) => {
        setMainCurrency(value);
    };

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data: Currency[]) => {
                setData(data.filter((currency) => CURRENCIES_CONFIG.includes(currency.Cur_Abbreviation)));
            });
    }, []);

    return (
        <div className="App">
            <InputField
                currentAbbr="BYN"
                onChangeHandler={onChangeHandler}
                currentValue={mainCurrency}
            />
            {
                data.map((currency) => (
                    <InputField
                        key={currency.Cur_ID}
                        currentAbbr={currency.Cur_Abbreviation}
                        onChangeHandler={onChangeHandler}
                        currentValue={convert(mainCurrency, currency)}
                        disabled={true}
                    />
                ))
            }
        </div>
    );
}

export default App;

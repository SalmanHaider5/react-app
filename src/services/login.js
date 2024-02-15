import { urls } from "../constants"
import { loginFormatters } from "../formatters"

export const login = async (body) => {
    const data = loginFormatters.formatLoginData(body);
    if(!data) return undefined;
    const url = urls.BASE_URL + urls.LOGIN;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json();
}

export const register = async (body) => {
    const data = loginFormatters.formatLoginData(body);
    if(!data) return undefined;
    const url = urls.BASE_URL + urls.REGISTER;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
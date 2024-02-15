import { urls } from "../constants"
import { magazinesFormatters } from "../formatters";

export const fetchAllMagazines = async () => {
    const url = urls.BASE_URL + urls.MAGAZINES;
    const response = await fetch(url)
    return response.json();
}

export const subscribeMagazine = async (body) => {
    const data = magazinesFormatters.formatMagazineSubscriptionData(body);
    if(!data) return undefined;
    const url = urls.BASE_URL + urls.SUBSCRIPTIONS;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return response.json();
}
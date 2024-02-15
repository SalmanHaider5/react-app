import { urls } from "../constants"

export const fetchCurrentSubscriptions = async (userId) => {
    console.log(userId);
    if(userId){
        const url = urls.BASE_URL + urls.CURRENT_SUBSCRIPTIONS + userId;
        const response = await fetch(url)
        return response.json();
    }
}

export const fetchPastSubscriptions = async (userId) => {
    if(userId){
        const url = urls.BASE_URL + urls.PAST_SUBSCRIPTIONS + userId;
        const response = await fetch(url)
        return response.json();
    }
}

export const removeSubscription = async (subscriptionId) => {
    const url = urls.BASE_URL + urls.SUBSCRIPTIONS + subscriptionId;
    const response = await fetch(url, { method: 'DELETE' })
    return response.json();
}
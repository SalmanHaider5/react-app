import { has, isEmpty } from 'ramda';

const validateLoginObject = obj => has('username', obj) && has('password', obj) &&
!isEmpty(obj.username) && !isEmpty(obj.password);

export const formatLoginData = data => {
    const validated = validateLoginObject(data);
    if(!validated) return undefined;
    return {
        username: data.username,
        password: data.password
    }
}
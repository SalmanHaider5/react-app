import { has, isEmpty } from 'ramda';
const validateLoginObject = obj => has('userId', obj) && has('magazineId', obj) &&
!isEmpty(obj.userId) && !isEmpty(obj.magazineId);

export const formatMagazineSubscriptionData = data => {
    const validated = validateLoginObject(data);
    if(!validated) return undefined;
    return {
        userId: data.userId,
        magazineId: data.magazineId
    }
}
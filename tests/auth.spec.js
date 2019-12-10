import { fetchIt } from '../api/vincent-api';
import "isomorphic-fetch";

describe('auth', function() {
    let it = global.it;

    it('should work', () => {
        return fetchIt(
            'https://vincentschedules.com/api/user/authenticate',
            {
                method: 'POST',
                body: JSON.stringify({
                	"churchId":1,
	                "roleId":1,
	                "username":"george",
	                "password":"church"    
                })
            },
            30000
        ).then(
            (data) => {
                console.log(data);
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    });
});
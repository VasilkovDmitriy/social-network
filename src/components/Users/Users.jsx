import React from 'react';
import User from "./User";
import SmallPreloader from "../common/Preloader/SmallPreloader";

const Users = ({usersItems, follow, unfollow, isFollowFetching, isAuth, followingError}) => {
    if (!usersItems) {
        return <SmallPreloader/>
    }

    const users = usersItems.map(user => {
        return <User key={user.id}
                     user={user}
                     follow={follow}
                     unfollow={unfollow}
                     isFollowFetching={isFollowFetching}
                     isAuth={isAuth}
                     followingError={followingError}/>
    })

    return <div>
        {users}
    </div>
}

export default Users;
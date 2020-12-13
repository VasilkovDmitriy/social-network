import React, {useEffect} from 'react';
import style from './Users.module.css'
import Users from "./Users";
import {connect} from "react-redux";
import {
    getIsFollowFetching,
    getPageSize,
    getPortionNumber,
    getTotalUsersCount,
    getUsersItems
} from "../../redux/users-selectors";
import {follow, requestUsersItems, setPageSize, setPortionNumber, unfollow} from "../../redux/users-reducer";
import {Pagination} from "antd";
import {getIsAuth} from "../../redux/authentication-selectors";

const UsersContainer = ({
                            requestUsersItems,
                            usersItems,
                            pageSize,
                            portionNumber,
                            setPageSize,
                            setPortionNumber,
                            totalCount,
                            follow,
                            unfollow,
                            isFollowFetching,
                            isAuth
                        }) => {

    useEffect(() => {
        requestUsersItems(pageSize, portionNumber)
    }, [pageSize, portionNumber, requestUsersItems]);

    const onPaginatorChange = (newPortionNumber, newPageSize) => {
        if (newPortionNumber !== portionNumber) {
            setPortionNumber(newPortionNumber);
        }
        if (newPageSize !== pageSize) {
            setPageSize(newPageSize);
        }
    }

    const Paginator = totalCount ? <Pagination showQuickJumper
                                               className={style.paginator}
                                               onChange={onPaginatorChange}
                                               current={portionNumber}
                                               pageSize={pageSize}
                                               total={totalCount}/>
        : null;

    return <div>
        {Paginator}
        <Users usersItems={usersItems}
               follow={follow}
               unfollow={unfollow}
               isFollowFetching={isFollowFetching}
               isAuth={isAuth}/>
    </div>
}

const mapStateToProps = (state) => ({
    usersItems: getUsersItems(state),
    totalCount: getTotalUsersCount(state),
    portionNumber: getPortionNumber(state),
    pageSize: getPageSize(state),
    isFollowFetching: getIsFollowFetching(state),
    isAuth: getIsAuth(state)
});

export default connect(mapStateToProps,
    {requestUsersItems, setPortionNumber, setPageSize, follow, unfollow})(UsersContainer);
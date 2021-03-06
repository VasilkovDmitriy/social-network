import React, {useState, useEffect} from 'react';
import SmallPreloader from "../common/Preloader/SmallPreloader";
import ProfileInfo from "./ProfileInfo";
import ProfileEditForm from "./ProfileEditForm";
import {Alert} from "antd";

const Profile = ({
                     profileData,
                     saveProfile,
                     isProfileSavedSuccess,
                     profileError,
                     savePhoto,
                     userStatus,
                     updateUserStatus,
                     isOwner,
                     editProfileFormError
                 }) => {
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (isProfileSavedSuccess) {
            setEditMode(false);
        }
    }, [isProfileSavedSuccess]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = (profileFormData) => {
        saveProfile(profileFormData);
    }

    const exitWithoutSaving = () => {
        setEditMode(false);
    }

    const onUploadPhoto = (photo) => {
        savePhoto(photo);
        return Promise.reject();
    }

    if (profileError) {
        return <Alert message={profileError}
                      type="error"
                      showIcon/>
    }


    if (!profileData) {
        return <SmallPreloader/>
    }

    return editMode
        ? <ProfileEditForm profileData={profileData}
                           deactivateEditMode={deactivateEditMode}
                           editProfileFormError={editProfileFormError}
                           exitWithoutSaving={exitWithoutSaving}/>

        : <ProfileInfo profileData={profileData}
                       activateEditMode={activateEditMode}
                       onUploadPhoto={onUploadPhoto}
                       userStatus={userStatus}
                       updateUserStatus={updateUserStatus}
                       isOwner={isOwner}/>
}

export default Profile;
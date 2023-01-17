import React from 'react';
import styles from './UserInfo.module.scss';
import HackerAvatar from '../../assets/hacker.png';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl ? avatarUrl : HackerAvatar} alt={avatarUrl ? fullName : ` < a href="https://www.flaticon.com/free-icons/hacker" title="hacker icons">Hacker icons created by Freepik - Flaticon</>`} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};

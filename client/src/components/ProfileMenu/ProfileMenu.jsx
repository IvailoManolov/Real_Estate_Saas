import React from 'react';
import { Menu, rem, Avatar } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconMessageCircle,
} from '@tabler/icons-react';
import { MdAccountBalance } from 'react-icons/md';
import { BiHeartSquare, BiMoney } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { replace } from 'lodash';

const ProfileMenu = ({ user, logout }) => {

    const navigate = useNavigate();

    return (
        <Menu shadow="md" width={300} >
            <Menu.Target>
                <Avatar src={user?.picture} alt='user image' radius={'xl'} />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>

                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                    Settings
                </Menu.Item>

                <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                    Notifications
                </Menu.Item>

                <Menu.Item leftSection={<BiHeartSquare style={{ width: rem(14), height: rem(14) }} />}>
                    Favorites
                </Menu.Item>

                <Menu.Item
                    onClick={() => navigate("./bookings", { replace: true })}
                    leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
                >
                    Bookings
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Actions</Menu.Label>


                <Menu.Item
                    color="green"
                    leftSection={<BiMoney style={{ width: rem(14), height: rem(14) }} />}
                >
                    Subscription
                </Menu.Item>

                <Menu.Item
                    onClick={() => {
                        console.log('logout')
                        localStorage.clear();
                        logout();
                    }}
                    color="red"
                    leftSection={<MdAccountBalance style={{ width: rem(14), height: rem(14) }} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default ProfileMenu
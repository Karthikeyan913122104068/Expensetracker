import React from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/globalContext';

function Navigation({ active, setActive }) {
    const navigate = useNavigate();
    const { user } = useGlobalContext();
    const currentUser = user || JSON.parse(localStorage.getItem("user"));

    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <NavStyled>
            {/* User Section */}
            <div className="user-section">
                <img src={avatar} alt="User Avatar" className="avatar" />
                <div className="user-info">
                    <h2>{currentUser?.name || "User"}</h2>
                    <p>Your Money</p>
                </div>
            </div>

            {/* Menu Items */}
            <ul className="menu">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        <span className="icon">{item.icon}</span>
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>

            {/* Sign Out */}
            <div className="signout" onClick={handleSignOut}>
                {signout}
                <span>Sign Out</span>
            </div>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
    width: 260px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #ffab2e, #ffac06);
    backdrop-filter: blur(12px);
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    padding: 2rem 1rem;
    box-shadow: 6px 0 20px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    border-radius: 20px; /* Rounded panel edges */

    .user-section {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2.5rem;
        padding: 0.8rem;
        border-radius: 15px; /* Curved edges for user box */
        background: rgba(255, 255, 255, 0.15);

        .avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.5);
            object-fit: cover;
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease;
        }

        .avatar:hover {
            transform: scale(1.05);
        }

        .user-info {
            h2 {
                font-size: 1.2rem;
                font-weight: 700;
                margin-bottom: 0.2rem;
                background: linear-gradient(90deg, #222260, #5a5ac0);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            p {
                font-size: 0.85rem;
                color: #666;
                font-weight: 500;
            }
        }
    }

    .menu {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;

        li {
            display: flex;
            align-items: center;
            gap: 0.9rem;
            padding: 0.9rem 1rem;
            font-size: 0.95rem;
            font-weight: 500;
            color: #555;
            border-radius: 12px; /* Rounded menu items */
            cursor: pointer;
            transition: all 0.25s ease;
            position: relative;

            .icon {
                font-size: 1.25rem;
                color: #777;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                transition: color 0.25s ease;
            }

            &:hover {
                background: linear-gradient(135deg, rgba(34, 34, 96, 0.08), rgba(90, 90, 192, 0.1));
                color: #222260;
                transform: translateX(4px);

                .icon {
                    color: #5a5ac0;
                }
            }
        }

        .active {
            background: linear-gradient(135deg, #5a5ac0, #222260);
            color: #fff;
            font-weight: 600;
            box-shadow: 0 4px 10px rgba(34, 34, 96, 0.25);

            .icon {
                color: #fff;
            }
        }
    }

    .signout {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 0.85rem 1rem;
        font-weight: 600;
        color: #d9534f;
        border-radius: 12px; /* Curved sign out button */
        cursor: pointer;
        transition: all 0.25s ease;
        margin-top: auto;
        background: rgba(217, 83, 79, 0.08);

        &:hover {
            background: linear-gradient(135deg, rgba(217, 83, 79, 0.15), rgba(255, 99, 95, 0.18));
            transform: translateX(4px);
            box-shadow: 0 3px 8px rgba(217, 83, 79, 0.2);
        }

        svg {
            font-size: 1.25rem;
        }
    }
`;

export default Navigation;

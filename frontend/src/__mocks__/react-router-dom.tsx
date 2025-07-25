
import React from 'react';

export const BrowserRouter = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Route = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Routes = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const NavLink = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const Link = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
export const useNavigate = () => jest.fn();

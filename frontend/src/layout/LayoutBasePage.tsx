import { Icon } from '@iconify/react';
import { Box, Paper, Typography, useTheme, IconButton, useMediaQuery, Theme } from '@mui/material'
import React, { ReactNode } from 'react';
import { useDraweContext } from 'shared/context';

interface PageBaseLayoutProps {
    children: ReactNode;
    title: string;
}

export const LayoutBasePage: React.FC<PageBaseLayoutProps> = ({ children, title }) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    const { toggleDrawerOpen } = useDraweContext();

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '9px'

            }}
        >
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap={1}
                height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}

            >
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon icon='mdi:hamburger-menu'></Icon>
                    </IconButton>)}
                <Typography

                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                >
                    {title}
                </Typography>

            </Box>

            <Box flex={1} overflow="auto">
                {children}
            </Box>

        </Box>
    )
}
"use client";
import { useTranslations } from "next-intl"
import styles from '../components/Navbar.module.css';
import { Button } from 'antd';
import { useCallback, useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { message } from 'antd';
import { TextField, Modal, Box } from '@mui/material';
import { useTheme } from '../components/hooks/useTheme';
import { usePathname } from "next/navigation";

const Home = () => {
    const { theme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        email: false,
        message: false
    });

    // ✅ ИСПРАВЛЕНО: Используем функциональное обновление и useCallback
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        let value = e.target.value;

        if (field === 'phone') {
            value = value.replace(/\D/g, '');
            if (value.length > 9) {
                value = value.slice(0, 9);
            }
        }

        // ✅ Функциональное обновление для formData
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // ✅ Очищаем ошибку только для этого поля
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [field]: false
            }));
        }
    },[]);

    const handleCancel = () => {
        // Сбрасываем ошибки
        setErrors({
            name: false,
            phone: false,
            email: false,
            message: false
        });

        // ОЧИЩАЕМ ДАННЫЕ ФОРМЫ
        setFormData({
            name: '',
            phone: '',
            email: '',
            message: ''
        });

        // Закрываем модалку
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const newErrors = {
            name: !formData.name.trim(),
            phone: !formData.phone.trim() || formData.phone.length < 9,
            email: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
            message: !formData.message.trim()
        };

        setErrors(newErrors);

        if (newErrors.name || newErrors.phone || newErrors.email || newErrors.message) {
            // message.error('Пожалуйста, заполните все поля корректно');
            return;
        }

        setLoading(true);
        try {
            const result = await emailjs.send(
                'service_68qnbqz',
                'template_j84bs1a',
                {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message || 'Нет сообщения',
                },
                'fMQauStCI9E6gDSsL'
            );

            if (result.status === 200) {
                message.success('Успешно отправлено!');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: ''
                });
                handleCancel();
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            message.error('Ошибка отправки. Проверьте консоль для деталей.');
        } finally {
            setLoading(false);
        }
    };

    const t = useTranslations("HomePage");

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // mixHeight: '50vh',
        bgcolor: theme.modalBackground,
        color: theme.modalText,
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <header  id="home-section" className={styles.home_container}>
                <div className={styles.typewriter_container}>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.backgroundVideo}
                    >
                        <source src="/video_home.mp4" type="video/mp4" />
                    </video>
                </div>

                <div>
                    <p className={styles.DescriptionHome}>
                        {t('description')}
                    </p>
                </div>

                <Button
                    onClick={showModal}
                    className={styles.btnZayafka}
                    type="dashed"
                    ghost
                >
                    {t('ostavitZayafku')}
                </Button>

                <Modal
                    open={isModalOpen}
                    onClose={handleCancel}
                    aria-labelledby="modal-title"
                >
                    <Box sx={modalStyle}>
                        <h2 id="modal-title" style={{ color: theme.text }}>
                            {t('textModal')}
                        </h2>

                        <TextField
                            required
                            fullWidth
                            label={t('vveditVasheImya')}
                            value={formData.name}
                            onChange={(e) => handleInputChange(e, 'name')}
                            type="text"
                            variant="outlined"
                            error={errors.name}
                            helperText={errors.name ? t('home:inputRequired') : " "}
                            sx={{
                                minHeight: '70px',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: theme.inputBackground,
                                    height: '45px',
                                    '& input, & textarea': {
                                        color: theme.text,
                                        height: '100%',
                                        padding: '12px 14px',
                                    },
                                    '& fieldset': {
                                        borderColor: theme.inputBorder,
                                        borderWidth: '1.5px',
                                        top: '10',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: errors.name ? theme.error : theme.inputBorder,
                                        borderWidth: '1.5px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.inputBorder,
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: theme.modalText,
                                    transform: 'translate(14px, 13px) scale(1)',
                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                        transform: 'translate(14px, -5px) scale(0.75)', // Позиция при фокусе/заполнении
                                    },
                                    '&.Mui-focused': {
                                        color: theme.modalText,
                                    },
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(10px, -6px) scale(0.75)', // Фиксированная позиция для shrink
                                },
                                '& .MuiFormHelperText-root': {
                                    marginLeft: 0,
                                },
                            }}

                        />

                        <TextField
                            required
                            fullWidth
                            label={t('numberPhone')}
                            value={formData.phone}
                            onChange={(e) => handleInputChange(e, 'phone')}
                            variant="outlined"
                            inputProps={{ maxLength: 9 }}
                            error={errors.phone}
                            helperText={errors.phone ? t('home:inputRequired') : " "}
                            sx={{
                                height: '70px',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: theme.inputBackground,
                                    height: '45px',
                                    '& input, & textarea': {
                                        color: theme.text,
                                        height: '100%',
                                        padding: '14px 12px',
                                    },
                                    '& fieldset': {
                                        borderColor: theme.inputBorder,
                                        borderWidth: '1.5px',
                                        top: '10',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: errors.phone ? theme.error : theme.inputBorder,
                                        borderWidth: '1.5px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.inputBorder,
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: theme.modalText,
                                    transform: 'translate(14px, 12px) scale(1)',
                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                        transform: 'translate(14px, -5px) scale(0.75)', // Позиция при фокусе/заполнении
                                    },
                                    '&.Mui-focused': {
                                        color: theme.modalText,
                                    },
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -9px) scale(0.75)', // Фиксированная позиция для shrink
                                },
                                '& .MuiFormHelperText-root': {
                                    marginLeft: 0,
                                },
                            }}
                        />

                        <TextField
                            required
                            fullWidth
                            label={t('vvediteEmail')}
                            value={formData.email}
                            onChange={(e) => handleInputChange(e, 'email')}
                            variant="outlined"
                            type="email"
                            error={errors.email}
                            helperText={errors.email ? t('home:inputRequired') : " "}
                            sx={{
                                minHeight: '70px',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: theme.inputBackground,
                                    height: '45px',
                                    '& input, & textarea': {
                                        color: theme.text,
                                        height: '100%',
                                        padding: '14px 12px',
                                    },
                                    '& fieldset': {
                                        borderColor: theme.inputBorder,
                                        borderWidth: '1.5px',
                                        top: '10',
                                    },
                                    '& .MuiFormHelperText-root': {
                                        borderColor: errors.email ? theme.error : theme.inputBorder,
                                        borderWidth: '1.5px',
                                        marginLeft: 0,
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.inputBorder,
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: theme.modalText,
                                    transform: 'translate(14px, 12px) scale(1)',
                                    '&.Mui-focused, &.MuiFormLabel-filled': {
                                        transform: 'translate(14px, -5px) scale(0.75)', // Позиция при фокусе/заполнении
                                    },
                                    '&.Mui-focused': {
                                        color: theme.modalText,
                                    },
                                },
                                '& .MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -9px) scale(0.75)', // Фиксированная позиция для shrink
                                },

                            }}
                        />

                        <TextField
                            required
                            fullWidth
                            label={t('home:EntenIdea')}
                            value={formData.message}
                            onChange={(e) => handleInputChange(e, 'message')}
                            variant="outlined"
                            multiline
                            rows={3}
                            helperText={errors.message ? t('home:inputRequired') : " "}
                            sx={{
                                minHeight: '80px',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: theme.inputBackground,
                                    '& textarea': {
                                        color: theme.text,
                                    },
                                    '& fieldset': {
                                        borderColor: errors.message ? theme.error : theme.inputBorder,
                                        borderWidth: '1.5px',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: errors.message ? theme.error : theme.inputBorder,
                                        borderWidth: '1.5px',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.inputBorder,
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: theme.modalText,
                                    '&.Mui-focused': {
                                        color: theme.modalText,
                                    },
                                },
                                '& .MuiFormHelperText-root': {
                                    color: errors.message ? theme.error : 'inherit',
                                    marginLeft: 0,
                                }
                            }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                            <Button className={styles.BtnSend} onClick={handleCancel} disabled={loading}>
                                {t('home:EnterCancell')}
                            </Button>
                            <Button
                                className={styles.BtnSend}
                                type="primary"
                                onClick={handleSubmit}
                                loading={loading}
                            >
                                {t('home:EnterOk')}
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </header>
        </>
    )
}

export default Home;
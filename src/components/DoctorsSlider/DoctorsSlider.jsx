import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { runComponentActionFetch } from '../../services/FetchData/FetchData';
import { ArrowLeft, ArrowRight } from '../Icons/ArrowIcons';
import LazyImage from '../LazyImage/LazyImage';

export default function DoctorSlider({
    component,
    breakpoints = {
        0: {
            slidesPerView: 1,
        },
        421: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        }
    },
    action,
    signedParameters,
    spaceBetween,
    filters,
    speed,
    csrfToken,
    initialDoctors = [],
    initialPage = 1,
    initialTotalPages = 1,
    imagePlaceholderBase64 = '',
}) {
    const [doctors, setDoctors] = useState(initialDoctors || []);
    const [currentPage, setCurrentPage] = useState(initialPage || 1);
    const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
    const [isLoading, setIsLoading] = useState(false);
    const swiperRef = useRef(null);
    const didInitializeRef = useRef(false);


    const fetchDoctors = useCallback(async (page) => {
        try {
            setIsLoading(true);
            const timeoutPromise = new Promise(resolve => setTimeout(resolve, 300));
            const fetchPromise = runComponentActionFetch({
                component,
                mode: 'class',
                action,
                signedParameters,
                params: {queryObject: {page: page}, filters, csrfToken}
            });
            const [, response] = await Promise.all([timeoutPromise, fetchPromise]);
            setDoctors(prev => {
                const existingIds = new Set(prev.map(doc => doc.doctor_id));
                const newDoctors = response.data?.filter(doc => !existingIds.has(doc.doctor_id))||[];
                return page === 1 ? [...newDoctors] : [...prev, ...newDoctors];
            });
            setCurrentPage(response.page);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setIsLoading(false);
        }
    }, [component, action, filters, csrfToken, signedParameters]);

    const handleReachEnd = useCallback(() => {
        if (!isLoading && currentPage < totalPages) {
            fetchDoctors(currentPage + 1);
        }
    }, [currentPage, totalPages]);
    useEffect(() => {
        // On first mount: if we have initial doctors (from server HTML), keep them and don't refetch.
        // When dependencies (e.g., filters) change, fetch fresh data.
        if (!didInitializeRef.current) {
            didInitializeRef.current = true;
            if (initialDoctors && initialDoctors.length > 0) {
                return;
            }
        }
        fetchDoctors(1);
    }, [fetchDoctors, signedParameters]);

    return (
        <div className="slider-container">
            {isLoading && (
                <div className="preloader-overlay">
                    <div className="preloader-spinner">
                        <div className="spinner"></div>
                        <p>Загрузка врачей...</p>
                    </div>
                </div>
            )}
            <div className="swiper-navigation">
                <button className="swiper-button-prev">
                    <ArrowLeft />
                </button>
                <button className="swiper-button-next">
                    <ArrowRight />
                </button>
            </div>
            <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                slidesPerView={breakpoints[768].slidesPerView}
                spaceBetween={spaceBetween}
                speed={speed}
                loop={false}
                watchSlidesProgress={true}
                breakpoints={breakpoints}
                onReachEnd={handleReachEnd}
                
            >
                {doctors.map((doctor) => (
                    <SwiperSlide key={doctor.doctor_id}>
                        <div className="doctor-card" data-key={doctor.doctor_id}>
                            <figure className="figure doctor-figure">
                                <LazyImage
                                    src={doctor.doctor_img_url}
                                    placeholder={imagePlaceholderBase64}
                                    alt={`${doctor.doctor_lastname.replace(/'/g, '')} ${doctor.doctor_firstname.replace(/'/g, '')}`}
                                    className="img-fluid doctor-image"
                                />
                            </figure>
                            <div className="doctor-info">
                                <div className="doctor-content">
                                    <a className="topcontent" href={doctor.doctor_url.replace(/'/g, '')}>
                                        <div className="doctor-lastname">{doctor.doctor_lastname.replace(/'/g, '')}</div>
                                        <div className="doctor-firstname">{doctor.doctor_firstname.replace(/'/g, '')}</div>
                                        <div className="doctor-position">{doctor.doctor_position.replace(/'/g, '')}</div>
                                    </a>

                                    <div className="bottomcontent">
                                        <div className="doctor-pre">Категория, ученая степень</div>
                                        <div className="doctor-category">{doctor.doctor_category.replace(/'/g, '') || 'Не указано'}</div>
                                        <div className="doctor-pre">Тип</div>
                                        <div className="doctor-category">{doctor.doctor_patient_age_type.replace(/'/g, '') || 'Не указано'}</div>
                                        <div className="doctor-pre">Стаж</div>
                                        <div className="doctor-category">{doctor.doctor_experience.num} {doctor.doctor_experience.type.replace(/'/g, '')}</div>
                                        <div className="doctor-pre">Медицинский центр</div>
                                        <div className="doctor-category">{doctor.doctor_branch.replace(/'/g, '') || 'Не указано'}</div>
                                    </div>
                                </div>
                                {doctor.id_tt ? (
                                    <button
                                        type="button"
                                        className="fastlink openMedWidget ps-btn ps-btn--warning doctor-button"
                                        data-workerid={doctor.id_tt}
                                    >
                                        Записаться
                                    </button>
                                ) : (
                                    <a
                                        className="ps-btn ps-btn--warning doctor-button"
                                        href={doctor.doctor_url.replace(/'/g, '')}
                                    >
                                        Записаться
                                    </a>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

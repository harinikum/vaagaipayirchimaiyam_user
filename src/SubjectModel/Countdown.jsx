import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { axiosInstance } from '../component/Api/instance';
import { useNavigate } from 'react-router-dom';

const CountdownTimer = ({ paper, subjectId }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const email=localStorage.getItem("userMail");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchTimeDifference = async () => {
            try {
               
                        const response = await axiosInstance.post(`post/U_SubjectTest.php`,
                            {
                                id:email,
                                subject_id:subjectId,
                                paper_id: paper,
                            }
                        );
                        console.log(response.data);
                        
                if (!response || !response.data || !response.data[1]) {
                    console.error("Invalid API response:", response);
                    return;
                }
                
                
                const serverTime = new Date(response.data[1].test_end);
                const currentTime = new Date();
                const timeDifference = Math.floor((serverTime - currentTime) / 1000); // difference in seconds
                setTimeLeft(timeDifference > 0 ? timeDifference : 0);
            } catch (error) {
                console.error("Error fetching time difference:", error);
            }
        };

        fetchTimeDifference();
    }, [paper,subjectId]);

    useEffect(() => {
        if (timeLeft === 0) {
            setModalIsOpen(true);
            setTimeout(() => {
                setModalIsOpen(false);
                navigate("/subinstruction");
            }, 2000);
            return;
        }

        const timer = timeLeft > 0 && setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            {timeLeft !== null ? (
                <p>TIME: {formatTime(timeLeft)}</p>
            ) : (
                <p>Loading...</p>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Times Up!"
            >
                <div>
                    <p>Times Up!</p>
                </div>
            </Modal>
        </div>
    );
};

export default CountdownTimer;

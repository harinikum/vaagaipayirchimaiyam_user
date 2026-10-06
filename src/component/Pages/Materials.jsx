import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Typography, Card, CardContent, Fade, Box } from '@mui/material';
import WestIcon from "@mui/icons-material/West";
import { NavLink } from 'react-router-dom';
import { axiosInstance } from '../Api/instance';
import { UserContext } from '../../Context';
import DownloadIcon from '@mui/icons-material/Download';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Materials() {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const selectedSubject = localStorage.getItem("selectedSubject");
    const selectedSno = localStorage.getItem("selectedSno");

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await axiosInstance.post('get/U_ViewMaterials.php');
            if (response.status === 200) {
                if (Array.isArray(response.data)) {
                    // Filter materials by category and institution_id columns for the selected subject
                    const isCategoryMatch = (itemCat, selSubj) => {
                        if (!itemCat || !selSubj) return true;
                        const cat = itemCat.toUpperCase();
                        const sub = selSubj.toUpperCase();
                        if (cat === sub) return true;
                        if ((sub === "KT" || sub === "MAINS") && (cat === "KT" || cat === "MAINS")) return true;
                        if ((sub === "TNTET" || sub === "PRELIMS") && (cat === "TNTET" || cat === "PRELIMS")) return true;
                        if ((sub === "PG" || sub === "SUBJECT") && (cat === "PG" || cat === "SUBJECT")) return true;
                        if ((sub === "UG" || sub === "NON_NURSING") && (cat === "UG" || cat === "NON_NURSING")) return true;
                        if ((sub === "TNSET" || sub === "MODEL") && (cat === "TNSET" || cat === "MODEL")) return true;
                        if ((sub === "FREE" || sub === "YEAR") && (cat === "FREE" || cat === "YEAR")) return true;
                        return false;
                    };

                    const filtered = response.data.filter(item =>
                        isCategoryMatch(item.category, selectedSubject) &&
                        String(item.institution_id) === String(selectedSno)
                    );
                    setMaterials(filtered);
                }
            }
        } catch (error) {
            console.error("Error fetching materials:", error);
        } finally {
            setLoading(false);
        }
    };

    const { Endpoint } = React.useContext(UserContext);
    const handleDownload = (pdfPath) => {
        const baseUrl = Endpoint.replace("controllers/api/User/", "").replace("vaagaimaiyam.vebbox.in", "adminvaagaimaiyam.vebbox.in");
        const downloadUrl = `${baseUrl}${encodeURI(pdfPath)}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.download = pdfPath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box sx={{
            backgroundColor: '#f3e9dc',
            minHeight: '100vh',
            py: 4,
            background: 'linear-gradient(135deg, #f3e9dc 0%, #e5d5c0 100%)'
        }}>
            <Container>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <NavLink to="/card" style={{
                        color: "#5e3023",
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        background: 'white',
                        padding: '8px',
                        borderRadius: '50%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        marginRight: '15px'
                    }}>
                        <WestIcon />
                    </NavLink>
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: '#5e3023',
                        letterSpacing: '-0.5px'
                    }}>
                        Study Materials
                    </Typography>
                </Box>

                <Row>
                    {!loading && materials.length > 0 ? (
                        materials.map((material, index) => (
                            <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                                <Fade in={true} timeout={(index + 1) * 300}>
                                    <Card sx={{
                                        borderRadius: '20px',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                                        },
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.3)'
                                    }}>
                                        <Box sx={{
                                            background: 'linear-gradient(45deg, #5e3023 30%, #8a4f3d 90%)',
                                            height: '60px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            px: 3
                                        }}>
                                            <MenuBookIcon sx={{ color: 'white', mr: 1 }} />
                                            <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                                                PDF MATERIAL
                                            </Typography>
                                        </Box>
                                        <CardContent sx={{ p: 3 }}>
                                            <Typography variant="h6" sx={{
                                                fontWeight: 600,
                                                mb: 2,
                                                color: '#333',
                                                minHeight: '60px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {material.topic}
                                            </Typography>

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mt: 2
                                            }}>
                                                <Typography variant="caption" color="textSecondary">
                                                    Added: {new Date(material.upload_date).toLocaleDateString()}
                                                </Typography>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleDownload(material.pdf_path)}
                                                    style={{
                                                        borderRadius: '30px',
                                                        padding: '8px 20px',
                                                        fontWeight: 600,
                                                        background: '#5e3023',
                                                        border: 'none',
                                                        boxShadow: '0 4px 6px rgba(94, 48, 35, 0.2)'
                                                    }}
                                                >
                                                    <DownloadIcon fontSize="small" sx={{ mr: 0.5 }} /> Download
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Fade>
                            </Col>
                        ))
                    ) : !loading && (
                        <Col className="text-center mt-5">
                            <Box sx={{ p: 5, background: 'rgba(255,255,255,0.5)', borderRadius: '20px' }}>
                                <Typography variant="h6" color="textSecondary">No study materials found.</Typography>
                                <Typography variant="body2" color="textSecondary">Check back later for updates.</Typography>
                            </Box>
                        </Col>
                    )}
                </Row>
            </Container>
        </Box>
    );
}

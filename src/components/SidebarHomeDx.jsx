import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React, { useState } from "react";

import { Container, Row, Col, Card } from 'react-bootstrap'
import { SlArrowRight } from "react-icons/sl";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { PiGridFourFill } from "react-icons/pi";

const SidebarHomeDx = () => {
    const [visiblePosts, setVisiblePosts] = useState(5); 
    
    const posts = [
        { title: "Tech: le tendenze del 2025", date: "2 giorni fa", readers: "2.371 lettori" },
        { title: "Come sarà il lavoro nel 2025", date: "1 giorno fa", readers: "442 lettori" },
        { title: "\"Chiuso per festa\"", date: "22 minuti fa", readers: "" },
        { title: "Big Ideas: 15 spunti per il 2025", date: "2 giorni fa", readers: "4.647 lettori" },
        { title: "Unicredit-Banco Bpm", date: "1 giorno fa", readers: "3.743 lettori" },
        { title: "Revolut diventa banca italiana", date: "2 giorni fa", readers: "1.048 lettori" },
        { title: "Che cosa fa Gemini 2.0", date: "2 giorni fa", readers: "665 lettori" },
        { title: "Istantanee dal Maximall Pompeii", date: "2 giorni fa", readers: "456 lettori" },
        { title: "Approvato il Ddl Lavoro", date: "2 giorni fa", readers: "445 lettori" },
        { title: "Censis fotografa gli italiani", date: "2 giorni fa", readers: "371 lettori" }
    ]

    const loadMore = () => {
        setVisiblePosts((prev) => Math.min(prev + 5, posts.length));
    };
    
    const showLess = () => {
        setVisiblePosts(5); 
    };

    return(
         <Container style={{ width: '18rem' }}>
            <Card>
              <Card.Body>
                <Card.Title>In primo piano</Card.Title>
                <Card.Subtitle>a cura di Linkedin Notizie</Card.Subtitle>
                {/* Post */}
                {posts.slice(0, visiblePosts).map((post, index) => (
                        <div key={index} className="mb-2">
                            <strong>{post.title}</strong>
                            <div>
                                <small>
                                    {post.date}
                                    {post.readers && ` • ${post.readers}`}
                                </small>
                            </div>
                        </div>
                    ))}

                    {/* Pulsante "Vedi Altro" o "Meno dettagli" */}
                    {visiblePosts < posts.length ? (
                        <Button variant="link" onClick={loadMore}>Vedi Altro</Button>
                    ) : (
                        <Button variant="link" onClick={showLess}>Meno dettagli</Button>
                    )}
                <div>I giochi di oggi</div>
                <Row>
                    <Col><PiGridFourFill /></Col>
                    <Col>Tango #74
                         <div>Armonizza la griglia</div>
                    </Col>
                    <Col><SlArrowRight /></Col>
                </Row>
                <Row>
                    <Col><BsGrid3X3GapFill /></Col>
                    <Col>Queens #234
                         <div>Incorona ogni regione</div>
                    </Col>
                    <Col><SlArrowRight /></Col>
                </Row>
              </Card.Body>
            </Card>
        </Container>

    )

}

export default SidebarHomeDx
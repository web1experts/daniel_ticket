import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Table, Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdAdd } from "react-icons/io";
import './translatorStyle.css';
import '../../App.css';
import { listTranslator, DeleteTranslator } from "~/store/slices/translator/action";
import swal from "sweetalert";
import TranslatorSidebarPanel from "./translatorSidebar";

function TranslatorMain() {
    const dispatch = useDispatch();
    const { data, api_status, isAuthenticated, totalPages } = useSelector((state: any) => state.translator);
    const [spinnerloading, setSpinnerLoading] = useState(false);
    const [IsData, setIsData] = useState(false);
    const [TranslatorData, setTranslatorData] = useState([]);
    const [loadFirstTime, setLoadFirstTime] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Items per page

    const options = [
        { value: "sqi_Latn", label: "Albanian" },
        { value: "pes_Arab", label: "Farsi (Persian)" },
        { value: "ita_Latn", label: "Italian" },
        { value: "jpn_Jpan", label: "Japanese" },
        { value: "lit_Latn", label: "Lithuanian" }
    ];

    const deleteTranslate = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this translator!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                dispatch(DeleteTranslator({ trans_id: id }));
            }
        });
    };

    useEffect(() => {
        if (loadFirstTime) {
            dispatch(listTranslator({ page: currentPage, limit: itemsPerPage }));
        }
    }, [dispatch, loadFirstTime, currentPage]);

    useEffect(() => {
        if (data && data.length > 0 && api_status === 203 && isAuthenticated) {
            setIsData(true);
            setTranslatorData(data);
        } else {
            setIsData(false);
        }
    }, [data, api_status, isAuthenticated]);

    const getLabelsFromValues = (values, options) => {
        if (!Array.isArray(values)) {
            return '';
        }
        return values
            .map(value => {
                const match = options.find(option => option.value === value);
                return match ? match.label : null;
            })
            .filter(label => label)
            .join(', ');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => (
        <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );

    return (
        <>
            <TranslatorSidebarPanel />
            <div className="content__container projects--page translator--page pb-5">
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mb-4">
                            <h2 className="d-flex justify-content-between">
                                Project List
                                <Button href="/add-translators" variant="primary" className="ml-auto">
                                    <IoMdAdd /> Create Project
                                </Button>
                            </h2>
                        </Col>
                        <Col sm={12}>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Tasks</th>
                                        <th>Due Date</th>
                                        <th>Languages</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {IsData ? (
                                        TranslatorData.length > 0 ? (
                                            TranslatorData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <a href={`/edit-translators?trans_id=${data._id}`}>{data.title || "N/A"}</a>
                                                    </td>
                                                    <td>{data.tasks.join(", ")}</td>
                                                    <td>
                                                        {data.due_date
                                                            ? new Date(data.due_date).toLocaleDateString("en-US", {
                                                                  year: "numeric",
                                                                  month: "short",
                                                                  day: "numeric",
                                                              })
                                                            : "N/A"}
                                                    </td>
                                                    <td>{getLabelsFromValues(data.lang, options)}</td>
                                                    <td>
                                                        <span
                                                            className={`text-uppercase ${
                                                                data.status === "active"
                                                                ? "text-success"
                                                                : data.status === "pending"
                                                                ? "text-warning"
                                                                : data.status === "closed"
                                                                ? "text-secondary"
                                                                : ""
                                                            }`}
                                                        >
                                                            {data.status || "N/A"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: "center" }}>
                                                    No records found on the server
                                                </td>
                                            </tr>
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: "center" }}>
                                                Loading...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col sm={12} className="d-flex justify-content-center mt-4">
                            {renderPagination()}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default TranslatorMain;
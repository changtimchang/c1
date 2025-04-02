"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // 클릭된 날짜와 시간을 저장
  const [lastFetchedTime, setLastFetchedTime] = useState(null);

  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(`/api/data?page=${page}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.totalPages);
      setError(null);
      setCurrentPage(page);
      // 현재 날짜와 시간을 추가
      const now = new Date();
      setLastFetchedTime(now.toLocaleString()); // 설정된 형식으로 날짜와 시간을 저장
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to fetch data");
    }
  };

  // 컴포넌트가 마운트될 때 처음 데이터를 가져옵니다.
  React.useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchData(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchData(currentPage - 1);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center bg-pink-500  h-8 py-4">
        Simulation Result Data
        {lastFetchedTime && <span className="ml-4">({lastFetchedTime})</span>}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table
        style={{ marginTop: "20px", border: "1px solid black", width: "100%" }}>
        <thead
          style={{
            marginTop: "20px",
            border: "1px solid black",
            width: "100%",
          }}>
          <tr>
            <th>id</th>
            <th>Temp</th>
            <th>v1</th>
            <th>v2</th>
            <th>porotiy</th>
            <th>soltime</th>
            <th>coldshut</th>
            <th>filltime</th>
            <th>lastair</th>
            <th>velocity</th>
            <th>quality</th>
            {/* 테이블의 다른 열을 추가합니다. */}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item) => (
            <tr key={item.id} className="gap-2">
              <td>{item.id}</td>
              <td>{item.Temp}</td>
              <td>{item.v1}</td>
              <td>{item.v2}</td>
              <td>{item.porotiy}</td>
              <td>{item.soltime}</td>
              <td>{item.coldshut}</td>
              <td>{item.filltime}</td>
              <td>{item.lastair}</td>
              <td>{item.velocity}</td>
              <td>{item.quality}</td>
              {/* 다른 열의 데이터를 추가합니다. */}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 text-md"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 text-md"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="grid grid-cols-4 gap-4 m-20">
        <Button
          variant="special"
          size="special"
          onClick={() => fetchData(currentPage)}>
          {" "}
          데이터 가져오기{" "}
        </Button>

        <Button variant="special" size="special">
          {" "}
          AI모델 학습하기{" "}
        </Button>
        <Button variant="special" size="special">
          {" "}
          AI모델 적용하기{" "}
        </Button>
        <Button variant="special" size="special">
          {" "}
          AI예측 사용하기{" "}
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;

import { Result } from "./Result/Result";
import { useSelector } from "react-redux";
import { GlobalState } from "../../Redux/Reducers";
import "./ResultContainer.css";
import { useEffect, useRef } from "react";

export const ResultContainer = () => {
  const results = useSelector((state: GlobalState) => state.results);

  const topRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (results.length > 2) {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);
  return (
    <div className="ResultWrapper">
      <div className="ResultHeader">Results</div>
      <div className="results">
        {results.map((result, index) => (
          <div key={index}>
            {result.winnerRankings.length !== 0 ? (
              <div>
                <div ref={topRef} />
                <h3>
                  Lap: {result.lapCount} - {1000 + result.lapCount * 200}M
                </h3>
                <Result result={result} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

import './styles.css';

interface PaginationProps {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

function Pagination({ canPrev, canNext, onPrev, onNext }: PaginationProps) {
  return (
    <div className="pagination">
      <button
        className="ui-button ui-button--secondary"
        type="button"
        disabled={!canPrev}
        onClick={onPrev}
      >
        Prev
      </button>
      <button
        className="ui-button ui-button--secondary"
        type="button"
        disabled={!canNext}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

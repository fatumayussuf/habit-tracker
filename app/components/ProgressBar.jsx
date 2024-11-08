export default function ProgressBar({ progress }) {
    const completed = progress.filter(Boolean).length;
    const percentage = (completed / progress.length) * 100;
  
    return (
      <div style={{ width: '100%', backgroundColor: '#ddd' }}>
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: '#4caf50',
            textAlign: 'center',
            color: 'white',
            padding: '5px 0',
          }}
        >
          {Math.round(percentage)}%
        </div>
      </div>
    );
  }
  
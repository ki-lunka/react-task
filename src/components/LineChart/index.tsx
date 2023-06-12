import { useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TrafficLog } from '../../types';
import { sortArrayBy } from '../../utils';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
  data: TrafficLog[];
}

const lineOptions = {
  responsive: true,
  title: {
    display: true,
    text: 'Conversions chart',
  },
};

export const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const getLineData = useCallback((data: TrafficLog[]) => {
    const sortedData = sortArrayBy<TrafficLog>(data, 'time');
    const days = Array.from(new Set(sortedData.map((el) => moment(el.time).format('MM/DD'))));
    const values: number[] = [];
    days.forEach((date) => {
      const logsPerDay = sortedData.filter((el) => moment(el.time).format('MM/DD') === date);
      const sumPerDay = logsPerDay.reduce((acc, log) => acc + log.revenue, 0);
      values.push(sumPerDay);
    });

    return {
      labels: days,
      datasets: [
        {
          label: 'Conversions',
          backgroundColor: 'rgba(13, 110, 253, 0.5)',
          borderColor: 'rgb(13, 110, 253, 1)',
          data: values,
        },
      ],
    };
  }, []);

  return <Line data={getLineData(data)} options={lineOptions} />;
};

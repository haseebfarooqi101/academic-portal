import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function AdminChart({ 
  type = 'line', 
  data = [], 
  title = '', 
  height = 300,
  color = '#8A36D0' 
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    chartInstance.current = echarts.init(chartRef.current);

    const getChartOption = () => {
      if (type === 'line') {
        return {
          title: {
            text: title,
            textStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#6B7280'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisLine: {
              lineStyle: {
                color: '#E5E7EB'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#6B7280',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#6B7280',
              fontSize: 12
            },
            splitLine: {
              lineStyle: {
                color: '#F3F4F6'
              }
            }
          },
          series: [{
            data: data.map(item => item.value),
            type: 'line',
            smooth: true,
            lineStyle: {
              color: color,
              width: 3
            },
            itemStyle: {
              color: color
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: `${color}20` },
                { offset: 1, color: `${color}05` }
              ])
            }
          }]
        };
      }

      if (type === 'bar') {
        return {
          title: {
            text: title,
            textStyle: {
              fontSize: 14,
              fontWeight: 'normal',
              color: '#6B7280'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisLine: {
              lineStyle: {
                color: '#E5E7EB'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#6B7280',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#6B7280',
              fontSize: 12
            },
            splitLine: {
              lineStyle: {
                color: '#F3F4F6'
              }
            }
          },
          series: [{
            data: data.map(item => ({
              value: item.value,
              itemStyle: {
                color: item.color || color
              }
            })),
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              borderRadius: [4, 4, 0, 0]
            }
          }]
        };
      }

      return {};
    };

    chartInstance.current.setOption(getChartOption());

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [data, type, title, color]);

  return (
    <div 
      ref={chartRef} 
      style={{ height: `${height}px`, width: '100%' }}
      className="bg-white rounded-lg"
    />
  );
}
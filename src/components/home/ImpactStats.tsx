
import { useRef, useEffect, useState } from 'react';
import { Chart } from '@/components/ui/chart';

const ImpactStats = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Monthly tree planting data
  const treeData = [
    { name: 'Jan', trees: 1200 },
    { name: 'Feb', trees: 1400 },
    { name: 'Mar', trees: 2000 },
    { name: 'Apr', trees: 2700 },
    { name: 'May', trees: 3500 },
    { name: 'Jun', trees: 4200 },
    { name: 'Jul', trees: 5100 },
    { name: 'Aug', trees: 6300 },
    { name: 'Sep', trees: 7800 },
    { name: 'Oct', trees: 9200 },
    { name: 'Nov', trees: 10500 },
    { name: 'Dec', trees: 12000 },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-forest-800 mb-4">Our Collective Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our community is growing and the difference we're making together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-forest-50 rounded-lg p-8 text-center">
            <div className="text-forest-600 font-bold text-4xl mb-2">
              {animate ? (
                <CountUp end={58243} duration={2} separator="," />
              ) : (
                '0'
              )}
            </div>
            <p className="text-forest-800 font-medium">Trees Planted</p>
          </div>
          <div className="bg-forest-50 rounded-lg p-8 text-center">
            <div className="text-forest-600 font-bold text-4xl mb-2">
              {animate ? (
                <CountUp end={3214} duration={2} separator="," />
              ) : (
                '0'
              )}
            </div>
            <p className="text-forest-800 font-medium">Active Members</p>
          </div>
          <div className="bg-forest-50 rounded-lg p-8 text-center">
            <div className="text-forest-600 font-bold text-4xl mb-2">
              {animate ? (
                <CountUp end={12} duration={2} />
              ) : (
                '0'
              )}
            </div>
            <p className="text-forest-800 font-medium">Countries Impacted</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
          <h3 className="text-xl font-semibold text-forest-800 mb-6">Monthly Tree Planting Progress</h3>
          <div className="h-80">
            <Chart
              type="bar"
              data={{
                labels: treeData.map(item => item.name),
                datasets: [
                  {
                    label: 'Trees Planted',
                    data: treeData.map(item => item.trees),
                    backgroundColor: '#4CAF50',
                    borderColor: '#388E3C',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Number of Trees',
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Month',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple CountUp component
const CountUp = ({ end, duration = 2, separator = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [end, duration]);

  return <>{count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)}</>;
};

export default ImpactStats;

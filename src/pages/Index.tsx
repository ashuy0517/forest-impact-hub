
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ImpactMap from "@/components/home/ImpactMap";
import SponsorshipPackages from "@/components/home/SponsorshipPackages";
import ImpactStats from "@/components/home/ImpactStats";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import RewardsSection from "@/components/home/RewardsSection";
import ReferralCallout from "@/components/home/ReferralCallout";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <ImpactMap />
      <SponsorshipPackages />
      <RewardsSection />
      <ReferralCallout />
      <ImpactStats />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;

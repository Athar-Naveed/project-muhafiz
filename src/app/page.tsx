"use client";

import { MessageSquare, Phone, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Your Safety Is Our Priority
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Providing support, resources, and immediate assistance for those
            facing harassment or domestic violence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-lg font-semibold"
            >
              Get Assistance Now
            </Link>
            <Link
              href="tel:1043"
              className="px-6 py-3 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors text-lg font-semibold"
            >
              Emergency: 1043
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-orange-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <MessageSquare className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Legal Assistance</h3>
              <p className="text-gray-600">
                Get Legal Assistance anywhere anytime.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Legal Resources</h3>
              <p className="text-gray-600">
                Access legal information and support services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Emergency Contacts</h3>
              <p className="text-gray-600">
                Quick access to emergency services and helplines.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

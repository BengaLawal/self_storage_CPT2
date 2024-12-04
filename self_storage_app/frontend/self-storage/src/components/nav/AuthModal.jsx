import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const handleLogin = (e) => {
        e.preventDefault();
        // Login logic will be implemented later
        console.log('Login attempted');
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Signup logic will be implemented later
        console.log('Signup attempted');
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                    Login
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[700px] bg-slate-950">
                <DialogHeader>
                    <DialogTitle className="text-center text-3xl mb-4">
                        Welcome to Self Storage
                    </DialogTitle>
                </DialogHeader>

                <Tabs
                    defaultValue="login"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger
                            value="login"
                            className="data-[state=active]:bg-blue-600 bg-transparent border-2 border-blue-400"
                        >
                            Login
                        </TabsTrigger>
                        <TabsTrigger
                            value="signup"
                            className="data-[state=active]:bg-orange-500 bg-transparent border-2 border-orange-400"
                        >
                            Sign Up
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <Label htmlFor="login-email" className="text-lg mb-2 block">
                                    Email Address
                                </Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-12 text-base"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="login-password" className="text-lg mb-2 block">
                                    Password
                                </Label>
                                <Input
                                    id="login-password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="h-12 text-base"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base"
                            >
                                Login
                            </Button>

                            <div className="text-center">
                                <a href="#" className="text-blue-600 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </TabsContent>

                    <TabsContent value="signup">
                        <form onSubmit={handleSignup} className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <Label htmlFor="signup-name" className="text-lg mb-2 block">
                                    Full Name
                                </Label>
                                <Input
                                    id="signup-name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="h-12 text-base"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="signup-email" className="text-lg mb-2 block">
                                    Email Address
                                </Label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-12 text-base"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="signup-password" className="text-lg mb-2 block">
                                    Password
                                </Label>
                                <Input
                                    id="signup-password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="h-12 text-base"
                                    required
                                />
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="signup-confirm-password" className="text-lg mb-2 block">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="signup-confirm-password"
                                    type="password"
                                    placeholder="Repeat your password"
                                    className="h-12 text-base"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-base"
                                >
                                    Create Account
                                </Button>
                            </div>

                            <div className="col-span-2 text-center text-sm text-gray-600">
                                By signing up, you agree to our
                                <a href="#" className="text-blue-600 ml-1 hover:underline">
                                    Terms of Service
                                </a>
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
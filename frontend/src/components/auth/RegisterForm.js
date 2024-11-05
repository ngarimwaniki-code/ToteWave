import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inputVariants } from "./animations";
import { formatPhoneNumber, stripPhonePrefix } from "@/utils/formValidation";
import { toast } from "sonner";

const RegisterForm = ({ registerForm, setRegisterForm, onSubmit }) => {
  const [phoneInput, setPhoneInput] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    if (registerForm.phone_number) {
      setPhoneInput(formatPhoneNumber(registerForm.phone_number));
    }
  }, []);

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhoneInput(formattedPhone);
    setRegisterForm({
      ...registerForm,
      phone_number: stripPhonePrefix(formattedPhone),
    });
  };

  const fetchAddressSuggestions = async (query) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    try {
      setIsLoadingSuggestions(true);
      const encodedQuery = encodeURIComponent(query + ", Kenya");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodedQuery}&format=json&countrycodes=ke&limit=5`
      );
      const data = await response.json();
      setAddressSuggestions(data);
    } catch (error) {
      toast.error("Error fetching address suggestions");
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleAddressChange = async (e) => {
    const address = e.target.value;
    setRegisterForm({ ...registerForm, address });
    fetchAddressSuggestions(address);
  };

  const handleSuggestionClick = (suggestion) => {
    setRegisterForm({
      ...registerForm,
      address: suggestion.display_name,
    });
    setAddressSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ...registerForm,
      phone_number: stripPhonePrefix(phoneInput),
    };
    onSubmit(e, formData);
  };

  return (
    <motion.form 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit} 
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <Input
            type="email"
            required
            value={registerForm.email}
            onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
            className="transform transition-all duration-300 focus:scale-105"
          />
        </motion.div>
        <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <Input
            type="tel"
            value={phoneInput}
            onChange={handlePhoneChange}
            placeholder="+254"
            className="transform transition-all duration-300 focus:scale-105"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <Input
            type="text"
            value={registerForm.first_name}
            onChange={(e) => setRegisterForm({ ...registerForm, first_name: e.target.value })}
            className="transform transition-all duration-300 focus:scale-105"
          />
        </motion.div>
        <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <Input
            type="text"
            value={registerForm.last_name}
            onChange={(e) => setRegisterForm({ ...registerForm, last_name: e.target.value })}
            className="transform transition-all duration-300 focus:scale-105"
          />
        </motion.div>
      </div>

      <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <div className="relative">
          <Input
            type="text"
            value={registerForm.address}
            onChange={handleAddressChange}
            className="transform transition-all duration-300 focus:scale-105"
            placeholder="Enter a Kenyan address"
          />
          {isLoadingSuggestions && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          )}
          {addressSuggestions.length > 0 && (
            <div className="absolute bottom-full mb-1 left-0 z-50 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
              {addressSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <Input
            type="password"
            required
            value={registerForm.password}
            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            className="transform transition-all duration-300 focus:scale-105"
          />
        </motion.div>
        <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm</label>
          <Input
            type="password"
            required
            value={registerForm.password2}
            onChange={(e) => setRegisterForm({ ...registerForm, password2: e.target.value })}
            className="transform transition-all duration-300 focus:scale-105"
          />
        </motion.div>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3">
          Register
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default RegisterForm;
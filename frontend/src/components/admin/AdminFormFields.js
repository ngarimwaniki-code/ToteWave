import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

export const AdminFormFields = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover="focus" variants={inputVariants}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    className="transform transition-all duration-300 focus:scale-105"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div whileHover="focus" variants={inputVariants}>
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Phone</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your phone number" 
                    className="transform transition-all duration-300 focus:scale-105"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover="focus" variants={inputVariants}>
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">First Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="First name" 
                    className="transform transition-all duration-300 focus:scale-105"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div whileHover="focus" variants={inputVariants}>
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Last Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Last name" 
                    className="transform transition-all duration-300 focus:scale-105"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      <motion.div whileHover="focus" variants={inputVariants}>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter your address" 
                  className="transform transition-all duration-300 focus:scale-105"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div whileHover="focus" variants={inputVariants}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Enter your password" 
                    className="transform transition-all duration-300 focus:scale-105"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div whileHover="focus" variants={inputVariants}>
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Confirm</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Confirm your password" 
                    className="transform transition-all duration-300 focus:scale-105"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>
      </div>
    </>
  );
};
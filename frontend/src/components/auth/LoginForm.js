import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inputVariants } from "./animations";

const LoginForm = ({ loginForm, setLoginForm, onSubmit }) => (
  <motion.form 
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    }}
    initial="hidden"
    animate="visible"
    onSubmit={onSubmit} 
    className="space-y-6"
  >
    <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
      <Input
        type="email"
        required
        value={loginForm.email}
        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
        className="transform transition-all duration-300 focus:scale-105"
      />
    </motion.div>
    <motion.div whileHover="focus" whileTap="focus" variants={inputVariants}>
      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
      <Input
        type="password"
        required
        value={loginForm.password}
        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        className="transform transition-all duration-300 focus:scale-105"
      />
    </motion.div>
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3">
        Login
      </Button>
    </motion.div>
  </motion.form>
);

export default LoginForm;
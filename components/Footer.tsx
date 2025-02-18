export default function Footer() {
  return (
    <footer className="p-4 bg-white dark:bg-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-gray-700 dark:text-gray-100">
          &copy; {new Date().getFullYear()} Farbod Fooladi Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

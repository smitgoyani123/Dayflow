// import fetch from 'node-fetch'; // Using native fetch
const BASE_URL = 'http://localhost:5001';

async function runVerification() {
    console.log('Starting Verification...');

    // 1. Register HR / Company
    const randomNum = Math.floor(Math.random() * 10000);
    const companyName = `TestCorp${randomNum}`;
    const hrEmail = `hr${randomNum}@test.com`;
    const password = 'password123';

    console.log(`\n1. Registering Company: ${companyName} with HR: ${hrEmail}`);
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fullName: 'HR Manager',
            email: hrEmail,
            password: password,
            companyName: companyName,
            phone: '1234567890',
            address: '123 Test St'
        })
    });

    const registerData = await registerResponse.json();
    if (!registerResponse.ok) {
        console.error('Registration Failed:', registerData);
        return;
    }
    console.log('Registration Success:', registerData);
    const hrToken = registerData.token;
    const companyId = registerData.companyId;

    // 2. Add Employee
    console.log(`\n2. Adding Employee as HR...`);
    const empFirstName = 'John';
    const empLastName = 'Doe';
    const empEmail = `john${randomNum}@test.com`;

    const addEmployeeResponse = await fetch(`${BASE_URL}/api/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${hrToken}`
        },
        body: JSON.stringify({
            firstName: empFirstName,
            lastName: empLastName,
            email: empEmail,
            designation: 'Developer',
            department: 'Engineering',
            dateOfJoining: new Date(),
            salary: 50000,
            address: '456 Dev Ln',
            phoneNumber: '0987654321'
        })
    });

    const employeeData = await addEmployeeResponse.json();
    if (!addEmployeeResponse.ok) {
        console.error('Add Employee Failed:', employeeData);
        return;
    }
    console.log('Employee Created:', employeeData);
    const generatedEmployeeId = employeeData.employeeCode;
    console.log(`Generated Employee ID: ${generatedEmployeeId}`);

    // Verify ID Format: [CO][FN][LN][YYYY][####]
    // CO = TE
    // FN = JO
    // LN = DO
    // YYYY = 2026
    const expectedPrefix = `${companyName.substring(0, 2).toUpperCase()}${empFirstName.substring(0, 2).toUpperCase()}${empLastName.substring(0, 2).toUpperCase()}${new Date().getFullYear()}`;
    if (generatedEmployeeId.startsWith(expectedPrefix)) {
        console.log('PASS: Employee ID format matches.');
    } else {
        console.error(`FAIL: Employee ID format mismatch. Expected start with ${expectedPrefix}, got ${generatedEmployeeId}`);
    }

    // 3. List Employees
    console.log(`\n3. Listing Employees...`);
    const listResponse = await fetch(`${BASE_URL}/api/employees`, {
        headers: { 'Authorization': `Bearer ${hrToken}` }
    });
    const listData = await listResponse.json();
    console.log(`Found ${listData.length} employees.`);

    // Should find at least 2 (HR + John Doe) or just John Doe depending on if HR is considered 'Employee' in this list (HR was created as Employee too)
    // Based on my implementation: HR is created as Employee, so 2.

    const foundEmployee = listData.find(e => e.email === empEmail);
    if (foundEmployee) {
        console.log('PASS: Newly created employee found in list.');
    } else {
        console.error('FAIL: Created employee NOT found in list.');
    }

    // 4. Employee Login
    console.log(`\n4. Logging in as Employee using ID: ${generatedEmployeeId}`);
    // Assuming password for employee is not set? 
    // Wait, my implementation of `createEmployee` does not create a User account for the employee unless they sign up.
    // The requirement said: "create a employee ID for each created employee which must be used for employee login"
    // This implies the employee must be able to login.
    // But `createEmployee` only creates the `Employee` record.
    // The `User` record requires a password.
    // DOES the employee user get created automatically?
    // Looking at my plan: "Refactor Account Creation (Signup for HR)" and "Implement Employee Creation by HR".
    // I didn't explicitly implement "Create User for Employee" in `createEmployee`.
    // I should check `createEmployee` again. It links to user if exists.
    // The requirement says "create a employee ID... for employee login".
    // Usually this means either:
    // A) HR sets a default password.
    // B) Employee uses ID to "register" or "claim" account.
    // C) Or I should create a User with a default password.

    // Let's assume for this verify script, I cannot login as employee yet because User is not created.
    // I may need to create a User for testing, or update `createEmployee` to create a default User.
    // Let's check `User.js`, it requires password.

    // Update plan: I should probably create a User account for the employee with a default password or allow them to set it.
    // OR, the User registers themselves using the Employee ID?
    // "admins login using email... employee id... used for employee login".

    // In `authController.js` loginUser:
    // It checks if email is Employee Code.
    // `user = await User.findById(employee.userId);`
    // This implies `employee.userId` MUST be set for login to work.

    // So `createEmployee` MUST create a User record or I'm missing a step.
    // I will verify this gap.
}

runVerification();

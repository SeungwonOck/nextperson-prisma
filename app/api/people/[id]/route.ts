//create a get method that will take id from the context , search for the id from prisma
//if found return the data record

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(request: Request, context: any) {
  const { id } = context.params;


  const person = await prisma.person.findUnique({
    where: {
      id: parseInt(id),
    }
  })
  if (!person) {
    return new Response('Not found', {
      status: 404,
    })
  }
  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })


}

function convertStringToDate(dateString: string) {
    const date = new Date(dateString);
    // Check if the Date object is valid
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: '${dateString}'`);
    }
    return date;
}


export async function PUT(request: Request, context: any) {
  const { id } = context.params;

  try {

    const body = await request.json();
    const { firstname, lastname, phone, dateOfBirth } = body;

    if (!firstname || !lastname || !phone || !dateOfBirth) {
      return new Response('Missing required fields', {
        status: 400,
      });
    }

    let dateOfBirthDate;
try {
    // Convert the dateOfBirth string to a Date object
    dateOfBirthDate = convertStringToDate(dateOfBirth);
} catch (error) {
    // Convert the error to a string before accessing the `message` property
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(`Invalid date format for dateOfBirth: ${errorMessage}`, {
        status: 400,
    });
}

    const updatedPerson = await prisma.person.update({
      where: {
        id: parseInt(id),
      },
      data: {
        firstname,
        lastname,
        phone,
        dateOfBirth: dateOfBirthDate,
        // You can add other fields to update here
      },
    });

    if (!updatedPerson) {
      return new Response('Person not found', {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedPerson), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Error', {
      status: 500,
    });
  }
}
export async function DELETE(request: Request, context: any) {
  const { id } = context.params;

  try {

      const deletedPerson = await prisma.person.delete({
          where: {
              id: parseInt(id),
          },
      });

      if (!deletedPerson) {
          return new Response('Person not found', {
              status: 404,
          });
      }

      return new Response('Person deleted successfully', {
          status: 200,
      });
  } catch (error) {
      return new Response('Error', {
          status: 500,
      });
  }
}
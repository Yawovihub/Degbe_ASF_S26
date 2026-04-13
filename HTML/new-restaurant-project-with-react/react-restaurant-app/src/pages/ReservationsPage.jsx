import React from 'react';
import { Container, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape(
  {
  name: yup.string().required("Name is required").max(20),
  email: yup.string().email("Invalid email").required("Email is required"),
    partySize: yup.number().transform((value, originalValue) => originalValue === "" ? undefined : value).nullable(),
  //partySize: yup.number().min(1).max(8).required("PartySize is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  seating: yup.string().required("Please select a seating preference"),
  }
);

const ReservationsPage = () => {
  const { register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors } } = useForm({resolver: yupResolver(schema)});

  //const handleChange = (e) => {setValue(e.target.name, e.target.value);};

  const onSubmit = (data) => {
    console.log(data);
    alert("Reservation Confirmed!");
    reset();
  };
  console.log("Validation Errors:", errors);
  return (
    <Container className="mt-4" style={{ maxWidth: '600px' }}>
      <h2>Make a Reservation</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Name</Label>
          <Input {...register("name")}
                 //onChange={handleChange}
                 invalid={!!errors.name} />
          <FormFeedback>{errors.name?.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input {...register("email")}
                 // onChange={handleChange}
                 invalid={!!errors.email} />
          <FormFeedback>{errors.email?.message}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            type="date"
            {...register("date")}
            invalid={!!errors.date}
          />
        </FormGroup>

        <FormGroup>
          <Label for="time">Time</Label>
          <Input
            type="time"
            {...register("time")}
            invalid={!!errors.time}
          />
        </FormGroup>

        <FormGroup>
          <Label>Party Size</Label>
          <Input
            type="number"
            {...register("partySize")}
            invalid={!!errors.partySize}
          />
          <FormFeedback>{errors.partySize?.message}</FormFeedback>
        </FormGroup>

        <FormGroup tag="fieldset">
          <legend>Seating Preference</legend>
          {['Indoor', 'Outdoor', 'Bar'].map(opt => (
            <FormGroup check key={opt}>
              <Label check>
                <Input type="radio" value={opt} {...register("seating")}
                       // onChange={handleChange}
                       invalid={!!errors.seating} /> {opt}
              </Label>
            </FormGroup>
          ))}
          {errors.seating && <span className="text-danger small">{errors.seating.message}</span>}
        </FormGroup>

        <Button color="primary" type={"submit"}>Submit Request</Button>
        <button color="secondary" className="ms-2" type={'reset'}>Reset Form</button>
      </Form>
    </Container>
  );
};

export default ReservationsPage;


